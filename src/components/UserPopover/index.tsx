import { Avatar } from "~/components/Avatar";
import { useAuth } from "~/hooks/useAuth";
import {
  Box,
  Button,
  Center,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Skeleton,
} from "@chakra-ui/react";

import { Item } from "./Item";
import { MdArrowDropDown as Icon } from "react-icons/MD";
import styles from "./UserPopover.module.css";

export const UserPopover = () => {
  const { user, signOut, loading } = useAuth();
  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <button className={styles.trigger}>
          <Avatar name={user?.displayName!} />
          <span className={styles.trigger_user_name}>
            <Skeleton isLoaded={!loading}>
              {user?.displayName!.split(" ")[0] || "Buscando..."}
            </Skeleton>
          </span>
          <Icon size={22} />
        </button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          w="15rem"
          _focus={{
            outline: "none",
          }}
        >
          <PopoverArrow />
          <PopoverHeader>
            <Center className="font-bold">
              Logado como {user?.displayName!.split(" ")[0]}
            </Center>
          </PopoverHeader>

          <PopoverBody>
            <Item>Item 1</Item>
            <Item>Item 2</Item>
            <Item>Item 3</Item>
            <Item>Item 4</Item>
          </PopoverBody>
          <PopoverFooter>
            <Item onClick={signOut}>Sair</Item>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};