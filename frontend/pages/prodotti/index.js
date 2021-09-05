import Link from 'next/link'
import Image from 'next/image'

export const getStaticProps = async () => {
    const res = await fetch("http://localhost:5000/api/product/")

    const data = await res.json();

    return {
        props: {
            products: data
        }
    }
}


export default function Prodotti  ({ products }) {
    return (
        <div>
            <h1>
                Lista prodotti
            </h1>
            {products.map(product => (
                <Link href={'/product/' + product._id} key={product._id}>

                    <div>

                        <h3>{product.name}</h3>
                        <p>
                            {product.description}
                        </p>

                        <Image src={'data:image/jpeg;base64,' + Buffer.from(product.photo.data.data, 'binary').toString('base64')} alt="Picture of the author" width={100} height={100} />
                    </div>
                </Link>
            ))}
        </div>

    );
}

