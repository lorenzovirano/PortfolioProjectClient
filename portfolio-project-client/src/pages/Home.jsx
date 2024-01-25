import Header from "../components/navbar/Header";
import Banner from "../components/banner/Banner";

export default function Home(props){
    return(
        <>
            <Header />
            <Banner title="Lorem ipsum" subtitle="Lorem ipsum" image="https://images.unsplash.com/photo-1495745966610-2a67f2297e5e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        </>
    )
}