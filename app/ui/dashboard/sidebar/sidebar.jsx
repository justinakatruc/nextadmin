import React from 'react'
import styles from './sidebar.module.css'
import MenuLink from './menuLink/menuLink'
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";
import { auth, signOut } from '@/app/auth';
import Image from 'next/image';

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Products",
        path: "/dashboard/products",
        icon: <MdShoppingBag />,
      },
      {
        title: "Transactions",
        path: "/dashboard/transactions",
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "/dashboard/revenue",
        icon: <MdWork />,
      },
      {
        title: "Reports",
        path: "/dashboard/reports",
        icon: <MdAnalytics />,
      },
      {
        title: "Teams",
        path: "/dashboard/teams",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
  // {
  //   title: "",
  //   list: [
  //     {
  //       title: "Logout",
  //       path: "/",
  //       icon: <MdLogout />,
  //     },
  //   ],
  // }
];

const Sidebar = async () => {
  const {user} = await auth();
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image className={styles.userImage} src={user.img || "/noavatar.png"} alt="" width="50" height="50" />
        <div className={styles.userDetail}>
          <span className={styles.username}>{user.username}</span>
          <span className={styles.userTitle}>{user.role}</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map(cat=>(
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map(item=>(<MenuLink item={item} key={item.title} />))}
          </li>
        ))}
      </ul>
      <form action={async () => {
        "use server";
        await signOut();
      }}>      
        <button className={styles.logout}>
          <MdLogout />
          Logout
        </button>
      </form>
    </div>
  )
}

export default Sidebar