import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="border-t bg-[#1E56A0] text-white">
            <div className="container px-4 py-8 md:px-6 md:py-12 max-w-[1280px] mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-semibold mb-3">Shop</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                                    Laptops
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                                    Desktops
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                                    Accessories
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                                    Monitors
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-3">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                                    Shipping
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                                    Returns
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-3">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                                    Press
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-3">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-white/80">© 2024 TechGear. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <Link href="#" className="text-white/80 hover:text-white transition-colors">
                            <span className="sr-only">Facebook</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5"
                            >
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                            </svg>
                        </Link>
                        <Link href="#" className="text-white/80 hover:text-white transition-colors">
                            <span className="sr-only">Twitter</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5"
                            >
                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                            </svg>
                        </Link>
                        <Link href="#" className="text-white/80 hover:text-white transition-colors">
                            <span className="sr-only">Instagram</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5"
                            >
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
