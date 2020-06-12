import React,{ Component } from 'react'
import { connect } from 'react-redux'
import {
  increment,
  decrement
} from '../../actions/cart'

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

@connect(mapStateToProps, mapDispatchToProps)
class CartList extends Component{
  // constructor(){
  //   super()
    // this.state = {
    //   cartList: [],
    //   store: {}
    // }
  // }

  // static getDerivedStateFromProps(props){
  //   return {
  //     store: props.store
  //   }
  // }

  // getState(){
  //   this.setState({
  //     cartList: this.state.store.getState().cart
  //   })
  // }

  // componentDidMount(){
  //   this.getState();
  //   this.state.store.subscribe(() => this.getState())
  // }

  render(){
    return (
      <table>
        <thead>
          <tr>
            <th>id</th> 
            <th>商品名称</th>
            <th>价格</th>
            <th>数量</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.cartList.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>
                    <button onClick={() => {this.props.reduce(item.id)}}>-</button>
                    {item.amount}
                    <button onClick={() => {this.props.add(item.id)}}>+</button>
                  </td>
                  <td></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }
}

export default CartList
// export default connect(mapStateToProps, mapDispatchToProps)(CartList)
// export default connect(mapStateToProps, { increment,decrement })(CartList)