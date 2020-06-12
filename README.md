## `react-lesson-01 作业完成情况统计表`

两部分实现：

+ 表单输入和提交按钮
+ 表单信息显示区域

思路：

1. 表单输入的信息提交之后要显示在显示区域，这要求表单信息应保存在两个组件的父组件中，输入表单信息则在父组件state中更新state，显示信息则将父组件state传递给子组件。
2. 当点击完成框时会切换作业完成状态，对应的事件处理函数同样定义在父组件中。



## `react-lesson-02 高阶组件和context的使用`

### `组件间通信`

父组件向子组件通信：

1. 使用props层层传递，但这种方法仅仅适合传递层级比较少的情况
2. 当跨级组件通信时，一种方法是使用context，但context会使组件的复用性变差，比如如果顶层组件数据发生改变，所有用到该数据的子组件都会发生改变，因此context一般用来管理theme或者用户信息，缓存数据，locale。
3. 跨级通信更好的解决方法是“[组件组合](https://react.docschina.org/docs/context.html)”，这种对组件的*控制反转*减少了在你的应用中要传递的 props 数量，这在很多场景下会使得你的代码更加干净，使你对根组件有更多的把控。但是，这并不适用于每一个场景：这种将逻辑提升到组件树的更高层次来处理，会使得这些高层组件变得更复杂，并且会强行将低层组件适应这样的形式。
4. 高阶组件是一种比较好的父子组件传递，提高了组件的复用性，解决了命名冲突问题。这也是对`mixin`组件复用方式的一种改进。

子组件向父组件通信：

1. 通过回调函数的形式

无嵌套关系的组件通信：

1. 发布订阅模式，在`componentDidMount`事件种，订阅事件，在`componentDidUnmount`事件中，取消订阅。

状态管理器：

使用`redux`、`mobx`、`Flux`进行状态统一管理。



## `react-lesson-04 redux store的实现原理`

创建store统一管理，对外暴露三个方法，分别负责获取state，修改state，监听state变化后渲染state。

```js
function createStore(reducer){
  let state = null;
  const getState = () => state;
  const listeners = [];
  const subscribe = (listener) => listeners.push(listener);
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener())
  }
  dispatch({}) // 初始化state
  return {
    getState,
    dispatch,
    subscribe
  }
}

// 1. 创建store实例
const store = new createStore(changeState);

// 2. 通过设置观察者模式，监听state变化并渲染，设置新旧state对比进行优化
let oldState = store.getState();
store.subscribe(() => {
  const newState = store.getState();
  renderApp(newState, oldState);
  oldState = newState;
})

// 3. 首次渲染
renderApp(store.getState())

// 4. 通过dispatch来修改state
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色
```

## `react-lesson-05 react-redux跨级状态管理`

`react-redux`使用Provider和connect来进行组件通信，在根组件中将store作为Provider的属性传递下去，在需要用到store状态的组件中使用connect接收state，然后使用装饰器的形式或者直接高阶组件形式对组件进行处理。

```js
function mapStateToProps(state){
  return {
    cartList: state.cart
  }
}

function mapDispatchToProps(dispatch){
  return {
    add: (id) => dispatch(increment(id)),
    reduce: (id) => dispatch(decrement(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartList)
// 或者
@connect(mapStateToProps, mapDispatchToProps)
class CartList extends Component{
}
```

### `react-lesson-06 异步action`

使用`redux-thunk`插件来处理异步action，要在配置文件中进行配置

### `react-lesson-07 路由`



