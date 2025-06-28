export async function data(pageContext) {
  const { id } = pageContext.routeParams
  return {
    productId: id
  }
}