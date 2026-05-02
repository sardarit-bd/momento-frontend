import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import footerlogo from "../../public/footerlogo.png";

const Footer = () => {
    return (
        <footer className="bg-white border-0 border-t border-gray-200 h-fit z-20 relative w-scrren">
            <Image src={footerlogo} alt="footer-logo" className="hidden md:block w-screen h-[92%] opacity-5 absolute top-0 left-0 z-10" />

            <div className="w-full flex items-center justify-center">
                <div className="w-full max-w-7xl px-3 md:px-7 grid grid-cols-4 items-start justify-center gap-5 my-10 z-20">
                    <div className="w-full col-span-4 md:col-span-2 lg:col-span-1">
                        <h3 className="font-bold text-2xl text-gray-600">About</h3>
                        <p className="text-gray-500 text-md pt-5">
                            At Momento Cards, we turn memories into moments of play. Whether you're customizing a deck for fun, gifting, or collecting — we make it easy to design cards that truly reflect you.
                        </p>
                        <div className="flex items-center gap-4 mt-6">
                            <Link className="z-30" href={'/'}>
                                <FaFacebookF className="text-2xl text-sky-500" />
                            </Link>
                            <Link className="z-30" href={'/'}>
                                <FaInstagram className="text-2xl text-sky-500" />
                            </Link>
                            <Link className="z-30" href={'/'}>
                                <FaTwitter className="text-2xl text-sky-500" />
                            </Link>
                        </div>
                    </div>
                    <div className="w-full col-span-4 md:col-span-2 lg:col-span-1 mt-5 md:mt-0">
                        <h3 className="font-bold text-2xl text-gray-600">Quick Links</h3>
                        <div className="mt-5">
                            <ul className="flex flex-col gap-3">
                                <Link href={'/about'} className="text-gray-500 text-md z-30">About</Link>
                                <Link href={'/about'} className="text-gray-500 text-md z-30">Shop</Link>
                                <Link href={'/about'} className="text-gray-500 text-md z-30">Card customization</Link>
                                <Link href={'/about'} className="text-gray-500 text-md z-30">Inspirations</Link>
                                <Link href={'/about'} className="text-gray-500 text-md z-30">Contact Us</Link>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full col-span-4 md:col-span-2 lg:col-span-1 mt-5 lg:mt-0">
                        <h3 className="font-bold text-2xl text-gray-600">Shop</h3>
                        <div className="mt-5">
                            <ul className="flex flex-col gap-3">
                                <Link href={'/about'} className="text-gray-500 text-md z-30">Momento Play Deck</Link>
                                <Link href={'/about'} className="text-gray-500 text-md z-30">Momento Game Deck</Link>
                                <Link href={'/about'} className="text-gray-500 text-md z-30">Momento Trading Cards</Link>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full col-span-4 md:col-span-2 lg:col-span-1 mt-5 lg:mt-0">
                        <h3 className="font-bold text-2xl text-gray-600">Get In Touch</h3>
                        <div className="mt-5">
                            <ul className="flex flex-col gap-3">
                                {/* <Link href={'/about'} className="text-gray-500 text-md z-30 flex gap-2">
                                    <MdEmail className="text-sky-500" />
                                    <span>123 Main Street New York, NY 10001</span>
                                </Link> */}
                                <Link href={'/about'} className="text-gray-500 text-md z-30 flex gap-2 flex items-center">
                                    <MdEmail className="text-sky-500" />
                                    <span>contact@momentocardgames.com</span>
                                </Link>
                                {/* <Link href={'/about'} className="text-gray-500 text-md z-30 flex gap-2">
                                    <MdEmail className='text-sky-500' />
                                    <span>123-456-7890</span>
                                </Link> */}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
            <div className="bg-sky-500 text-lg text-center text-white py-2 z-20">
                © 2025 Momento Cards. All Rights Reserved
            </div>
        </footer>
    )
}

export default Footer;