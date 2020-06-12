## 2020-4-23
### webpack的基本配置
+ 安装webpack  webpack-cli
+ 配置mode为production或development
+ 默认情况下会自动查找src下的index.js进行打包
+ 新建webpack.config.js文件，配置打包入口和出口，可以是多个入口，出口为了缓存可以使用chunkHash命名文件
+ webpack.config.js默认在项目根目录下，如果放到单独文件夹下如scripts，需更改配置，一个是package.json中指定--config scripts/webpack.config.js，另一个是webpack.config.js中__dirname改为process.cwd()

### webpack配置一个基本的开发环境
+ 现在要新建index.html展示界面，直接在dist中新建每次打包都要更改引入的js文件，麻烦
+ 使用html-webpack-plugin插件，默认会生成index.html，并将更新后的文件引入
+ 但是自动生成的index.html过于简单，最好自己指定一个index.html模板，比如放在public/index.html
+ 关于html-webpack-plugin的相关配置，选项有title/filename/template，相关配置可查看[这里](https://www.npmjs.com/package/html-webpack-plugin)
+ 关于css文件的打包，可以直接在js文件中import对应的css文件，但实际开发更喜欢css和js分离
+ css和js分离方法：
  + webpack4之前，一直都是使用extract-text-webpack-plugin，目前已经废弃，了解即可
  + webpack4之后，使用插件mini-css-extract-plugin从js文件中抽离css文件，并自动插入index.html，基本配置可见[这里](https://www.npmjs.com/package/mini-css-extract-plugin)
+ 打包后的dist目录整理，比如生成static/js,static/css,index.html，可以在filename前面加上各自路径
+ webpack-dev-server是在内存生成打包好的文件，热更新，有相关配置

### css预处理和autoprefixer
+ 预处理文件如less需要安装对应loader
+ 考虑使用css构建页面样式时浏览器的兼容性问题，需要在css代码前边加前缀，less在编译时是可以不全css代码的前缀的，css需要postcss-loader兼容性处理
+ postcss-loader一定要在style-loader,css-loader前边
+ postcss的配置信息需要单独在外面写配置文件才可以使用，配置文件postcss.config.js中需要配置autoprefixer插件，需要安装
+ package.json中需要配置browserslist，设置兼容的浏览器，或者新建单独的.browserslistrc文件进行配置

### 图片资源处理
+ file-loader直接将图片复制了一份
  + 我们希望打包的图片目录为dist/static/images/xxx.jpg|png，为此，我们需要设置file-loader的options选项中name前边加上路径static/images，另外还需要设置publicPath: '/'，和name进行拼接
+ url-loader则是对小图片进行base64编码，有个limit限制，url-loader里面已经有了file-loader功能，小于limit的base64编码，大于的file-loader编码

### 静态资源处理
+ 对于import或者background-image导入的图片，需要使用file-loader，这些资源是可以动态改变的
+ 对于一些静态资源，比如图片或者字体，则可以直接拷贝到打包文件中，src/static->dist/static
+ 需要使用插件copy-webpack-plugin专门复制静态资源到打包文件中，具体配置[可见](https://www.npmjs.com/package/copy-webpack-plugin)

### 安装babel-loader并对配置文件进行开发生产环境分离
+ 安装的时候需要考虑babel-loader和babel-core的版本匹配问题
+ babel-loader的options选项可以设置presets，或者单独抽离为.babelrc
+ 配置分离插件webpack-merge

## 2020-4-24
### 使用create-react-app创建一个应用
+ npx create-react-app myproject，create-react-app为react的脚手架，自动安装react，react-dom，react-script
+ react配置信息内部封装好了，需要查看的话npm run eject
+ vscode安装插件ES7 React/Redux/GraphQL/React-Native snippets

### 创建组件的原理
+ 函数式组件创建原理：本身是一个函数，return 要渲染的元素，执行该函数则创建出元素
```js
// 1. 箭头函数新建组件：直接以元素的形式作为参数，这是实现原理
const createApp = () => {
  return <h1>hello react!</h1>
}

const app = createApp()

// 2. 箭头函数新建组件：以标签的形式
const App = (props) => {
  return (
    <div>
      <h1>hello react</h1>
      <h2>{props.title}</h2>
    </div>
  )
}
```
+ 类组件：要渲染的DOM元素在render函数中，新建一个类的实例，并将对象作为参数传入(props)，创建的实例对象需要调用render方法才可以得到要渲染的元素
+ react16之前使用React.createClass来创建类组件

### jsx的原理
+ jsx=js+xml，并不是标准的js语法，其本质是React.createElement方法，这个是js语法，react真正渲染的时候会把jsx渲染成js语法

### 组件中添加样式
+ 使用style
+ 使用className，这种方法可以将css样式抽离出来
+ 动态添加className使用第三方包classnames, npm i classnames -S
+ 使用styled-components插件，js和css分离
+ 使用import导入的css文件，默认作用域全局，整个项目生效，因为css无作用域概念，那如何将css文件模块化呢？
  + 模块化的引入方式 import xxx from 'yyy'
  + vue中使用<style scoped></style>解决
  + react中，在webpack.config.js中设置rules，设置css-loader?modules来为css文件启用模块化，但是css文件的模块化只支持类选择器和id选择器
  + 使用localIdentName来自定义模块化的类名，localIdentName=[path][name]-[local]-[hash:5]
  + :global(.test)包裹起来的类名不会被模块化，而是全局生效；:local()则相反
  + 像第三方样式包bootstrap导入时，无需模块化，因此可以将自定义css文件改为.scss或.less文件，需安装sass-loader,file-loader

```js
import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import styled from 'styled-components'

import './style.css'

// 使用styled-components设置css样式
const Title = styled.li`
  color: #0f0
`

class App extends React.Component {
  render(){
    const style = {color: '#f00'}
    return (
      <div>
        <h1>设置css样式</h1>
        <ol>
          <li style={style}>使用style设置css样式</li>
          <li className='text-red'>使用className设置css样式</li>
          <li className={classNames('a', {'text-red': true, 'b': false})}>使用classnames动态设置css样式</li>
          <Title>使用styled-components动态设置css样式</Title>
        </ol>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
```


### react项目的目录结构
+ index.js + App.js(主组件)
+ 每个组件作为一个文件夹，组件名作为文件名，里面可以新建index.js也可以起别的名字或者小的子组件，格式为components/Xxx/index.js，另外component下边要新建一个index.js文件向外导出所有组件，逻辑清晰

### 组件的props和prop-types
+ 除了props，还要介绍指定props类型和props默认值
+ react15.5之后，引入了prop-types类型，用于设置props类型
  + 函数式组件，MyComponent.propTypes = {
    title: PropTypes.string
  }
  + 类组件，static propTypes = {
    title: PropTypes.string
  }
+ 设置props默认值，defaultProps
  + 函数式组件，MyComponent.defaultProps = {
    title: '默认值'
  }
  + 类组件，static defaultProps = {
    title: '默认值'
  }
+ 函数式组件没有state，所以是非受控组件，类组件有state，所以是受控组件

## 2020-4-25
### 模板渲染语法及props向下传递的技巧
+ 如果想在React中 使用浏览器 DOM 提供的 innerHTML 功能，使用代码直接设置 HTML 存在风险，因为很容易无意中使用户暴露于跨站脚本（XSS）的攻击。因此，需要使用dangerouslySetInnerHTML，传入一个对象，key为__html，类似于vue的v-html
```js
function createMarkup() {
  return {__html: 'First &middot; Second'};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```

+ 列表中多个组件遍历可以使用[].map()，注意key值
+ props向下传递的时候，如果props结构发生改变，则父子组件都要改，最好使用解构形式{...obj}

### setState修改数据
+ 一个是setState接收一个对象
+ 另一个是接收一个方法，两个参数prevState,props，函数的一个参数是前一个状态(prevState)，第二个参数是应用更新时的props,
+ 因为setState是异步的，如果想到得到最新的state，需要在回调中获取
```js
this.setState((prevState, props) => {
  return {
    isLiked: !prevState.isliked
  }
},() => {
  console.log(this.state.isLiked)
})
```

### 事件
+ react和原生的区别
+ this的绑定，两种方法
  + 直接在{}中写this.xxx.bind(this)
  + 构造函数中进行绑定
+ 三种传递参数方法
  + 箭头函数传参
  + bind参数传参
  + 通过状态提升的方式，将state和 method放到父组件，然乎通过props传参

### ref及键盘事件-完成todoList
+ 使用createRef方法创建ref，以方便获取input元素点击提交按钮时输入框自动聚焦

+ 使用propTypes来检验传递给子组件的数据的类型是否符合要求

+ 生成多选框，点击对应选项，改变完成状态
  + 复选框选中取消功能，因为复选框的数据是App组件传递下去的，其props属性为只读，所以要想改变isCompleted只能在App组件
