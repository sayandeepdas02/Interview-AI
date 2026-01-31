import Link from "next/link"
import { Github, Linkedin, Globe } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-slate-50 border-t py-12 lg:py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">I</span>
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-900">Interview AI</span>
                        </Link>
                        <p className="text-slate-500 max-w-xs mb-6">
                            The AI-powered hiring platform that helps you find the best talent, faster and without bias.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="https://www.sayandeep.space/" target="_blank" className="bg-slate-200 p-2 rounded-full hover:bg-primary hover:text-white transition-colors">
                                <Globe className="h-4 w-4" />
                            </Link>
                            <Link href="https://github.com/sayandeepdas02" target="_blank" className="bg-slate-200 p-2 rounded-full hover:bg-primary hover:text-white transition-colors">
                                <Github className="h-4 w-4" />
                            </Link>
                            <Link href="https://www.linkedin.com/in/sayandeep02" target="_blank" className="bg-slate-200 p-2 rounded-full hover:bg-primary hover:text-white transition-colors">
                                <Linkedin className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-900 mb-4">Product</h4>
                        <ul className="space-y-3 text-sm text-slate-600">
                            <li><Link href="#">Features</Link></li>
                            <li><Link href="#">Pricing</Link></li>
                            <li><Link href="#">Integrations</Link></li>
                            <li><Link href="#">Enterprise</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-900 mb-4">Resources</h4>
                        <ul className="space-y-3 text-sm text-slate-600">
                            <li><Link href="#">Blog</Link></li>
                            <li><Link href="#">Case Studies</Link></li>
                            <li><Link href="#">Documentation</Link></li>
                            <li><Link href="#">Help Center</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
                        <ul className="space-y-3 text-sm text-slate-600">
                            <li><Link href="#">About Us</Link></li>
                            <li><Link href="#">Careers</Link></li>
                            <li><Link href="#">Legal</Link></li>
                            <li><Link href="#">Contact</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-slate-500">
                        © {new Date().getFullYear()} Interview AI Inc. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-slate-500">
                        <Link href="#">Privacy Policy</Link>
                        <Link href="#">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
