import Image from "next/image";

const Page = (props: any) => {
    console.log(props)
    return (
        <div className="text-red">
            <h1 className="text-2xl font-semibold mb-4">Contact page</h1>
            <div className="my-2 flex flex-col border-2 w-[200px] p-4">
                <Image className="w-[200px]" src="/images/user2.png" height={1024} width={1024} alt="counselpro connect developer contact" />
                <div className="mt-4">
                    <p>Email - <a className="underline text-blue-800" href="mailto:heera9331@gmail.com">heera9331@gmail.com</a></p>
                    <p>Mobile No - <a className="underline text-blue-800" href="tel:8085589371">8085589371</a></p>
                </div>
            </div>
        </div>
    )
}

export default Page;