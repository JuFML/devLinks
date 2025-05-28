import { FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router"
import Input from "../../components/Input"

import { auth } from "../../services/firebaseConnection"
import { signInWithEmailAndPassword } from "firebase/auth"


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate("/admin", { replace: true }))
      .catch((error) => console.log("deu ruim", error))
  }


  return (
    <div className="flex w-full h-screen items-center justify-center flex-col">
      <Link to="/">
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl">Dev
          <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">Link</span>
        </h1>
      </Link>

      <form className="flex flex-col px-2 w-full max-w-xl" onSubmit={handleSubmit}>
        <Input placeholder="Digite seu email..." type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="*******" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button
          type="submit"
          className="h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white"
        >Acessar</button>
      </form>
    </div>
  )
}

export default Login