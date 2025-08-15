import Image from "next/image";
import { Button } from "../ui/button";
import HeroImage from "@/images/hero-image.png";

const Banner = () => {
    return (
        <section className="flex items-center mt-5">
            <div className="space-y-5 flex-1 flex md:block flex-col items-center text-center md:text-left">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                    ডিপ্লোমা লাইফ,{" "}
                    <span className="text-custom-primary">ইভেন্টে</span> ফুল অন!
                </h1>
                <p className="md:text-xl text-muted-text">
                    বন্ধুদের সাথে মজার মুহূর্ত, স্কিল শো-অফের সুযোগ, আর
                    নেটওয়ার্কিং—সব এক জায়গায়। আপনার জন্য সাজানো সব ডিপ্লোমা
                    ইভেন্ট, ওয়ার্কশপ আর প্রতিযোগিতা, এখন হাতের মুঠোয়!
                </p>
                <Button className="w-fit">চলো, ইভেন্টে যাই 🚀</Button>
            </div>
            <div className="flex-1 md:flex justify-center hidden">
                <Image
                    src={HeroImage}
                    alt="Hero Section image"
                    placeholder="blur"
                    width={500}
                    height={500}
                />
            </div>
        </section>
    );
};

export default Banner;
