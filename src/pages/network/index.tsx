import { FormEvent, useEffect, useState } from "react"
import Header from "../../components/Header"
import Input from "../../components/Input"

import { db } from "../../services/firebaseConnection"
import { getDoc, setDoc, doc } from "firebase/firestore"
import { toast } from "react-toastify"


const Network = () => {
  const [facebook, setFacebook] = useState("")
  const [instagram, setInstagram] = useState("")
  const [youtube, setYoutube] = useState("")

  const handleRegister = (e: FormEvent) => {
    e.preventDefault()

    const docRef = doc(db, "network", "link")
    setDoc(docRef, {
      facebook,
      instagram,
      youtube
    })
      .then(() => toast.success("Network links cadastrados com sucesso!"))
      .catch((error) => {
        console.log("ALGO DEU ERRADO AO CADASTRAR O LINK DOS NETWORKS!", error)
        toast.success("ALGO DEU ERRADO AO CADASTRAR O LINK DOS NETWORKS!")
      })

  }

  const loadLinks = () => {
    const docRef = doc(db, "network", "link")
    getDoc(docRef)
      .then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setFacebook(snapshot.data()?.facebook)
          setInstagram(snapshot.data()?.instagram)
          setYoutube(snapshot.data()?.youtube)
        }
      })
      .catch((error) => {
        toast.error("Não foi possivel buscar o link das Redes Sociais!")
        console.log("Não foi possivel buscar o link das Redes Sociais!:", error)
      })
  }

  useEffect(() => {
    loadLinks()
  }, [])

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas redes sociais</h1>

      <form onSubmit={handleRegister} className="flex flex-col mt-8 mb-3 w-full max-w-xl">
        <label className="text-white font-medium mt-2 mb-2">Link do facebook</label>
        <Input
          type="url"
          placeholder="Digite a url do facebook..."
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />

        <label className="text-white font-medium mt-2 mb-2">Link do instagram</label>
        <Input
          type="url"
          placeholder="Digite a url do instagram..."
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />

        <label className="text-white font-medium mt-2 mb-2">Link do youtube</label>
        <Input
          type="url"
          placeholder="Digite a url do youtube..."
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
        />

        <button type="submit" className="mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center">
          Salvar Links
        </button>
      </form>

    </div>
  )
}

export default Network