import React from "react";

const ItemList = ({ list }) => {
  return (
    <ul>
      {list.map(item => {
        if (typeof item === "string") return <div key={item}>{item}</div>;

        return Object.values(item).map(value => {
          // If value is an empty array
          if (value.length === 0) return null;
          // If value is a string
          if (typeof value === "string") return <div key={value}>{value}</div>;
          // Recursively call itself if value is an array
          return <ItemList list={value}></ItemList>;
        });
      })}
    </ul>
  );
};

export default ItemList;
