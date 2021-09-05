import Product from ".";

export const getStaticPaths = async () => {
    const res = await fetch("http://localhost:5000/api/product/")

    const data = await res.json();

    const paths1 = data.map(product => {
        
        return {
            params: { id: product._id }
        }
    })
    return {
        paths: paths1,
        fallback: false
        
    }

}
export const getStaticProps = async (context) => {
    const id = context.params.id;
    const res = await fetch("http://localhost:5000/api/product/" + id)
    const data = await res.json();

    return {
        props: {
            product: data
        }
    }
}
const Details = ({ product }) => {
    return (
        <div>
            <h1>
                {product.name}
            </h1>
            <p>{product.description}</p>
        </div>
    );
}

export default Details;