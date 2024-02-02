import Header from "../components/navbar/Header";
import Banner from "../components/banner/Banner";
import Footer from "../components/footer/Footer";

export default function Home(props){
    return(
        <>
            <Header />
            <Banner title="Lorem ipsum" subtitle="Lorem ipsum" image="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" filterOpacity={".5"} bannerLink={"/"} bannerCtaLabel={"Lorem"}/>
            <Footer />
        </>
    )
}