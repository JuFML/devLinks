import Social from "../../components/Social"
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa"

import { db } from "../../services/firebaseConnection"
import { getDocs, collection, getDoc, doc } from "firebase/firestore"

import { useEffect, useState } from "react"

import { toast } from "react-toastify"

interface LinkProps {
  id: string,
  name: string,
  url: string,
  textColor: string,
  bgColor: string,
}
interface NetworkProps {
  facebook: string,
  instagram: string,
  youtube: string
}

const Home = () => {
  const [links, setLinks] = useState<LinkProps[]>([])
  const [network, setNetwork] = useState<NetworkProps>()

  const getLinks = () => {
    getDocs(collection(db, "links"))
      .then((snapshot) => {
        const lista: LinkProps[] = []
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            textColor: doc.data().textColor,
            bgColor: doc.data().backgroundColor
          })
        })
        setLinks(lista)
      })
      .catch((error) => {
        toast.error("Algo deu errado ao buscar os links!")
        console.log("Algo deu errado ao buscar os links:", error)
      })
  }
  const getNetwork = () => {
    getDoc(doc(db, "network", "link"))
      .then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setNetwork({
            facebook: snapshot.data()?.facebook,
            instagram: snapshot.data()?.instagram,
            youtube: snapshot.data()?.youtube
          })
        }
      })
      .catch((error) => {
        toast.error("Algo deu errado ao buscar os links das redes sociais!")
        console.log("Algo deu errado ao buscar os links das redes sociais:", error)
      })
  }

  useEffect(() => {
    getLinks()
  }, [])

  useEffect(() => {
    getNetwork()
  }, [])

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">Juliana Fernandez</h1>
      <span className="text-gray-50 mb-5 mt-3">Veja meus links👇</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links.map(link => (
          <section style={{ backgroundColor: link.bgColor }} key={link.id} className="mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer">
            <a href={link.url} target="_blank">
              <p style={{ color: link.textColor }} className="text-base md:text-lg">
                {link.name}
              </p>
            </a>
          </section>
        ))}

        {network && Object.keys(network).length > 0 && (
          <footer className="flex justify-center gap-3 my-4">
            <Social url={network?.facebook}>
              <FaFacebook size={36} color="fff" />
            </Social>
            <Social url={network?.youtube}>
              <FaYoutube size={36} color="fff" />
            </Social>
            <Social url={network?.instagram}>
              <FaInstagram size={36} color="fff" />
            </Social>
          </footer>
        )}

      </main>
    </div>
  )
}

export default Home