import Link from 'next/link'
import Image from 'next/image'
const Navbar = () => {
    return (
        <nav>
            <div className="logo">
            <Image src="/favicon.ico" width={77} height={77}/>
                 <h1>
                    Header
                </h1>
            </div>
            <Link href="/"><a>Home</a></Link>
            <Link href="/prodotti"><a>Prodotti</a></Link>
            <Link href="/azienda"><a>Azienda</a></Link>
            <Link href="/contatti"><a>Contatti</a></Link>

            
        </nav>
    );
}

export default Navbar;