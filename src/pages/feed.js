import { useAuth } from "@/components/AuthProvider"
import Wallet from "@/components/Wallet";
import supabase from "@/utilities/supabase/frontend"

const Feed = () => {
    const { user } = useAuth()
    const signOut = () => supabase.auth.signOut();

    return (
        <>
            <div className="font-bold text-10xl">
                FEED
            </div>
            <div onClick={signOut}> Log out </div>
            <div className="font-bold text-20xl">
                {user?.email}
            </div>
            <Wallet />
        </>
    )
}

export default Feed