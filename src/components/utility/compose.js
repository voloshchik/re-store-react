const compose = (...funcs) => comp => {
  return funcs.reduceRight((prevRes, fn) => {
    return fn(prevRes);
  }, comp);
};
export default compose;
