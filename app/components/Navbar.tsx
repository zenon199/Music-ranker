"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function Navbar() {
    const session = useSession();
    return <div>
        <div className=" flex justify-between m-4">
            <div>
                Muzi
            </div>
            <div>
                {session.data?.user && <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick ={ () => signOut()}>Logout</button>}
                {!session.data?.user && <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick ={ () => signIn()}>Login</button>}

            </div>
        </div>
    </div>
}