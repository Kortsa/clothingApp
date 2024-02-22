import './cart-item.styles.scss';

const CartItem = ({cartItem, quantity}) => {
    const {name} = cartItem;
    return (
        <div className="">
            <h2>{name} </h2>
            <span>{quantity}</span>
        </div>
    );
};

export default CartItem;