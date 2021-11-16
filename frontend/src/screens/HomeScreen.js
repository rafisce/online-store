import React from "react";
import Product from "../components/Product";
import data from "../data";

const HomeScreen = () => {
  return (
    <div>
      <div class="row center">
        {data.products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
