import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow: hidden;
    }

    code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }

    .no-drag {
        -ms-user-select: none;
        -moz-user-select: -moz-none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        user-select: none;
    }

    particle {
        position: fixed;
        left: 0;
        top: 0;
        border-radius: 50%;
        pointer-events: none;
        opacity: 0;
        z-index:500;
    }
`

export default GlobalStyle
