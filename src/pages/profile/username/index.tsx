import { useAppSelector } from '@redux/hooks/useRedux';

const Username = () => {

    const {user} = useAppSelector(state => state.authentications);

    return (
        <>
            <p>{user?.username}</p>
        </>
    )
}

export default Username