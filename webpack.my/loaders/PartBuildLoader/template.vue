<script>
  export default {
    data() {
      return {
        // eslint-disable-next-line no-undef
        auto: $auto$,
      }
    },
    beforeCreate() {
      const partStyle = document.getElementById('partStyle')
      if (partStyle) return
      const style = document.createElement('style')
      style.type = 'text/css'
      style.id = 'partStyle'
      const styleText = document.createTextNode(`
          .part-build-container {
            width: 100%;
            height: 100%;
            font-size: 24px;
            display: flex;
          }
          .part-build-container button {
            width: 140px;
            height: 40px;
            margin: auto;
            background-color: white;
            color: #333;
            border-radius: 8px;
            outline: none;
          }
          .part-build-container .loading {
            width: 70px;
            height: 40px;
            margin: auto;
            display: flex;
            justify-content: space-between;
          }
          .part-build-container .loading span {
            display: inline-block;
            width: 8px;
            height: 100%;
            border-radius: 4px;
            background: lightblue;
            animation: load 1s ease infinite;
          }
          @keyframes load {
            0%,
            100% {
              height: 40px;
              background: lightblue;
            }
            50% {
              height: 70px;
              margin: -15px 0;
              background: lightblue;
            }
          }
          .part-build-container .loading span:nth-child(2) {
            animation-delay: 0.2s;
          }
          .part-build-container .loading span:nth-child(3) {
            animation-delay: 0.4s;
          }
          .part-build-container .loading span:nth-child(4) {
            animation-delay: 0.6s;
          }
          .part-build-container .loading span:nth-child(5) {
            animation-delay: 0.8s;
          }
        `)
      style.appendChild(styleText)
      document.head.appendChild(style)
    },
    created() {
      if (this.auto) this.emitPartBuild()
    },
    methods: {
      onClickBuild() {
        this.emitPartBuild()
        this.auto = true
      },
      emitPartBuild() {
        const xhr = new XMLHttpRequest()
        xhr.open('get', 'http://0.0.0.0:9527?hot=$slotModulePath$')
        xhr.send()
      },
    },
    render() {
      const loading = (
        <div class="loading">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )
      const button = <button onClick={this.onClickBuild}>立即构建</button>
      return (
        <div class="part-build-container">
          { this.auto ? loading : button }
        </div>
      )
    },
  }
</script>
