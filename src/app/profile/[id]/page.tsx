export default function UserID({params}:any) {
    return (
      <div className="flex items-center flex-col justify-center min-h-screen py-2">
        <h1 className="text-3xl font-bold mb-12">Profile Page</h1>
        <h2 className="text-2xl font-bold">User Profile {params.id}</h2>
      </div>
    );
  }
