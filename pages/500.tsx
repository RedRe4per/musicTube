import Image from "next/image";
import Link from "next/link";

export default function Custom500() {
  return (
    <section className="hero h-[82vh] bg-gray-650">
      <div className="hero-content flex-col lg:flex-row">
        <Image
          src="/images/error500.jpg"
          alt="500Error"
          className="max-w-sm rounded-lg shadow-2xl"
          width={200}
          height={400}
        />
        <div>
          <h1 className="text-5xl font-bold">500 - Server-side error occurred</h1>
          <p className="py-6">
            No resource found! It seems that the resource you need is not available in the
            server, maybe your resource Id is wrong, or other reasons. Please
            check and request again.
          </p>
          <Link href={"/"}>
            <button className="btn btn-primary">Home Page</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
