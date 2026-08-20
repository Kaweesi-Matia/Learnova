import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";
import api from "../../services/api";
import Loading from "../../components/Loading";

export default function WishlistPage() {
 const [items,setItems]=useState([]),[loading,setLoading]=useState(true),[error,setError]=useState("");
 const load=()=>api.get("/wishlist").then(r=>setItems(r.data.wishlist||[])).catch(e=>setError(e.response?.data?.message||"Unable to load wishlist.")).finally(()=>setLoading(false));
 useEffect(()=>{load()},[]);
 const remove=async id=>{await api.delete(`/wishlist/${id}`);setItems(x=>x.filter(i=>i.course?._id!==id));};
 if(loading)return <Loading/>;
 return <section><p className="eyebrow">Saved learning</p><h1 className="mt-2 text-3xl font-black">Wishlist</h1><p className="mt-2 text-slate-500">Courses you want to learn later.</p>{error?<div className="card mt-6 p-8 text-red-600">{error}</div>:items.length?<div className="mt-8 grid gap-5 md:grid-cols-2">{items.map(i=><article key={i._id} className="card overflow-hidden"><img src={i.course?.thumbnail} className="h-44 w-full object-cover"/><div className="p-5"><h3 className="text-xl font-bold">{i.course?.title}</h3><p className="mt-2 text-sm text-slate-500">Rating {i.course?.rating?.toFixed?.(1) || "0.0"} · ${i.course?.price || 0}</p><div className="mt-5 flex gap-2"><Link className="btn-primary" to={`/courses/${i.course?._id}`}>View Course</Link><button className="btn-secondary" onClick={()=>remove(i.course?._id)}><Trash2 size={17}/> Remove</button></div></div></article>)}</div>:<div className="card mt-8 p-12 text-center"><Heart className="mx-auto text-slate-300" size={42}/><h3 className="mt-4 text-xl font-bold">Your wishlist is empty</h3><Link to="/courses" className="btn-primary mt-5">Explore Courses</Link></div>}</section>;
}
