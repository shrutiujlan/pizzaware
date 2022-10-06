import React from "react";
import styled from "styled-components";
import {
  ConfirmButton,
  DialogueFooter,
  DialogueContent,
} from "../FoodDialogue/FoodDialogue";
import { formatPrice } from "../Data/FoodData";
import { getPrice } from "../FoodDialogue/FoodDialogue";

const OrderStyled = styled.div`
  position: fixed;
  right: 0px;
  top: 48px;
  width: 340px;
  background-color: white;
  height: calc(100% - 48px);
  z-index: 10;
  box-shadow: 4px 0px 5px 5px grey;
  display: flex;
  flex-direction: column;
`;
const OrderContent = styled(DialogueContent)`
  padding: 20px;
  height: 100%;
`;
const OrderContainer = styled.div`
  padding: 10px 0px;
  border-bottom: 1px solid grey;
  ${({ editable }) =>
    editable
      ? `
    &:hover {
      cursor: pointer;
      background-color: #e7e7e7;
    }
  `
      : `
    pointer-events: none; 
  `}
`;
const OrderItem = styled.div`
  padding: 10px 0px;
  display: grid;
  grid-template-columns: 20px 150px 20px 60px;
  justify-content: space-between;
`;
const DetailItems = styled.div`
  color: gray;
  font-size: 10px;
`;

export function Order({ orders, setOrders, setOpenFood }) {
  const subtotal = orders.reduce((total, order) => {
    return (total = total + getPrice(order));
  }, 0);

  const deleteItem = (index) => {
    const newOrders = [...orders];
    newOrders.splice(index, 1);
    setOrders(newOrders);
  };

  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  return (
    <OrderStyled>
      {orders.length === 0 ? (
        <OrderContent>Cart is empty</OrderContent>
      ) : (
        <OrderContent>
          <OrderContainer> Your Order: </OrderContainer>{" "}
          {orders.map((order, index) => (
            <OrderContainer editable>
              <OrderItem
                onClick={() => {
                  setOpenFood({ ...order, index });
                }}
              >
                <div>{order.quantity}</div>
                <div> {order.name}</div>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteItem(index);
                  }}
                >
                  {" "}
                  🗑{" "}
                </div>
                <div>{formatPrice(getPrice(order))}</div>
              </OrderItem>
              <DetailItems>
                {order.toppings
                  .filter((t) => t.checked)
                  .map((topping) => topping.name)
                  .join(", ")}
              </DetailItems>
              {order.choice && <DetailItems>{order.choice}</DetailItems>}
            </OrderContainer>
          ))}
          <OrderContainer>
            <OrderItem>
              <div />
              <div>Sub-Total</div>
              <div> {formatPrice(subtotal)} </div>
            </OrderItem>
            <OrderItem>
              <div />
              <div>Tax</div>
              <div> {formatPrice(tax)} </div>
            </OrderItem>
            <OrderItem>
              <div />
              <div>Total</div>
              <div> {formatPrice(total)} </div>
            </OrderItem>
          </OrderContainer>
        </OrderContent>
      )}

      <DialogueFooter>
        <ConfirmButton>Confirm</ConfirmButton>
      </DialogueFooter>
    </OrderStyled>
  );
}
