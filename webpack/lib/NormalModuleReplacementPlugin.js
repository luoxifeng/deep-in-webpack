/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const { join, dirname } = require("./util/fs");

/** @typedef {import("./Compiler")} Compiler */
/** @typedef {function(TODO): void} ModuleReplacer */

class NormalModuleReplacementPlugin {
	/**
	 * Create an instance of the plugin
	 * @param {RegExp} resourceRegExp the resource matcher
	 * @param {string|ModuleReplacer} newResource the resource replacement
	 */
	constructor(resourceRegExp, newResource) {
		this.resourceRegExp = resourceRegExp;
		this.newResource = newResource;
	}

	/**
	 * Apply the plugin
	 * @param {Compiler} compiler the compiler instance
	 * @returns {void}
	 */
	apply(compiler) {
		const resourceRegExp = this.resourceRegExp;
		const newResource = this.newResource;
		compiler.hooks.normalModuleFactory.tap(
			"NormalModuleReplacementPlugin",
			nmf => {
				nmf.hooks.beforeResolve.tap("NormalModuleReplacementPlugin", result => {
					/**
					 * 在未解析之前替换模块
					 */
					if (resourceRegExp.test(result.request)) {
						if (typeof newResource === "function") {
							newResource(result);
						} else {
							result.request = newResource;
						}
					}
				});

				nmf.hooks.afterResolve.tap("NormalModuleReplacementPlugin", result => {
					/**
					 * 解析完成之后替换模块，替换的只是模块的resource,即模块内容的读取地址
					 * 在开发模式输出结果中模块的id将保留原来的，因为模块id的是根据userRequest生成的
					 * 这里并没有改变模块的userRequest,只是改变了读取模块内容的地址
					 * createData.userRequest = 'xxxxxxxx' 可以改变模块的id
					 */
					const createData = result.createData;
					if (resourceRegExp.test(createData.resource)) {
						if (typeof newResource === "function") {
							newResource(result);
						} else {
							const fs = compiler.inputFileSystem;
							if (
								newResource.startsWith("/") ||
								(newResource.length > 1 && newResource[1] === ":")
							) {
								createData.resource = newResource;
							} else {
								createData.resource = join(
									fs,
									dirname(fs, createData.resource),
									newResource
								);

								
							}
						}
					}
				});
			}
		);
	}
}

module.exports = NormalModuleReplacementPlugin;
