
import styles from './Navbar.module.scss';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@redux/hooks/useRedux';
import { base_url_server, environment } from 'environment';
import { MdHome, MdOutlinePerson, MdOutlineQuestionMark } from "react-icons/md";
import { AiFillSave } from "react-icons/ai";
import { FaCode } from "react-icons/fa";
import Flex from '@components/flex/Flex';
import Hover from '@components/hover/Style1';
import Theme from './theme';

const NavbarLayout = () => {

    const { user } = useAppSelector(state => state.authentications);

    return (
        <nav className={styles.container}>
            <Flex>
                <Hover message="Website">
                    <Link to={base_url_server.production} target="_blank" rel="noopener noreferrer"><img src={process.env.PUBLIC_URL + '/logo64.png'} alt="Logo" /></Link>
                </Hover>
            </Flex>
            { user 
            ?
                <Flex>
                    <Hover message="Home"><Link to="/"><MdHome/></Link></Hover>
                    <Hover message="Scripts"><Link to="/scripts"><FaCode/></Link></Hover>
                    <Hover message="Help"><Link to="/help"><MdOutlineQuestionMark/></Link></Hover>
                    <Hover message="Credits"><Link to={base_url_server[environment]} target="_blank" rel="noopener noreferrer">{user.credit || 0}</Link></Hover>
                    <Hover message="Profile"><Link to="/profile"><MdOutlinePerson/></Link></Hover>
                    <Theme />
                </Flex>
            :
                <Flex>
                    <Hover message="Home"><Link to="/"><MdHome/></Link></Hover>
                    <Hover message="Localised Scripts"><Link to="/localised"><AiFillSave/></Link></Hover>
                    <Hover message="Login"><Link to="/login"><MdOutlinePerson/></Link></Hover>
                    <Theme />
                </Flex>
            }
        </nav>
    )
}

export default NavbarLayout