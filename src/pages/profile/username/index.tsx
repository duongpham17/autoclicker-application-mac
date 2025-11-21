import { useAppSelector } from '@redux/hooks/useRedux';
import Hover from '@components/hover/Style1';
import Flex from '@components/flex/Flex';

const Username = () => {

    const {user} = useAppSelector(state => state.authentications);

    return (
        <Flex>
            <Hover message="Username">{user?.username}</Hover>
            <Hover message="Credit">[ {user?.credit} ]</Hover>
        </Flex>
    )
}

export default Username