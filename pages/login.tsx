import { FC, useEffect } from "react";
import { useRouter } from "next/router"

const Login: FC = (props) => {
    const router = useRouter()

    const onFinish = async () => {
        router.push("/loginSuccess")
    }
    useEffect(() => {
        router.prefetch("/loginSuccess")
    })
    return <button onClick={onFinish}>登陆</button>
}

export default Login