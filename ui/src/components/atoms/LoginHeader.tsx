import logo from '../../assets/images/logo.png'
export const LoginHeader = () => {
  return (
    <div className=" mt-10">
        <div className="flex justify-center">
            <img 
                alt=""
                height="120" width="120"
                src={logo} 
            />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-secondary">
            Login to your Account
        </h2>
    </div>
  )
}
