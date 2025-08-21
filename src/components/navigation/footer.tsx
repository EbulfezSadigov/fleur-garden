import { Instagram, Linkedin, Twitter, Dribbble, Globe } from "lucide-react"

export default function Footer() {
  return (
      <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Fleur Garden</h2>
            <p className="text-gray-400 mb-6">Bizi izləyin</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Dribbble size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Globe size={20} />
              </a>
            </div>
          </div>

          {/* Business Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Business</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Şirkət haqqında
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Tərəfdaşlarımız
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Bloq
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Əlaqə
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Əlaqə</h3>
            <ul className="space-y-3">
              <li className="text-gray-400">Nizami rayonu, Bakı, Azərbaycan</li>
              <li>
                <a href="mailto:info@fleurgarden.com" className="text-gray-400 hover:text-white transition-colors">
                  info@fleurgarden.com
                </a>
              </li>
              <li>
                <a href="tel:+994777777770" className="text-gray-400 hover:text-white transition-colors">
                  +994 777 77 70
                </a>
              </li>
              <li>
                <a href="tel:+994777777770" className="text-gray-400 hover:text-white transition-colors">
                  +994 777 77 70
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center text-gray-400 text-sm mb-4 md:mb-0">
            <span className="mr-2">©</span>
            <span>Copyright | All Rights Reserved</span>
          </div>
          <div className="text-gray-400 text-sm">Markup tərəfindən hazırlanıb</div>
        </div>
      </div>
    </footer>
  )
}
