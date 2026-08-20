import DashboardLayout from "../layouts/DashboardLayout";
export default function PlaceholderPage({title,role="STUDENT",children}) {
 return <DashboardLayout role={role}><div className="card p-10"><p className="eyebrow">{role.toLowerCase()} portal</p><h1 className="mt-2 text-3xl font-black">{title}</h1><div className="mt-5 text-slate-500">{children||"This area is ready for the next feature in the LearnHub workflow."}</div></div></DashboardLayout>
}
