import Image from "next/image";
import { FC, useState } from "react";
import Link from "next/link";
import { 
  Avatar, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText, 
  Divider,
  IconButton,
  Tooltip
} from "@mui/material";
import {
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
  Notifications as NotificationsIcon
} from "@mui/icons-material";
import styles from "@/styles/head.module.scss";
import SiteMenu from "./SiteMenu";
import { EnvelopeIcon, FBIcon, IGIcon, YTIcon } from "../Icons/icons";

const Header: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  // 臨時用戶數據，未來可以從 Redux store 或 Context 獲取
  const user = {
    name: "麥麥",
    avatar: "/assets/image/common/default-avatar.png",
    isLoggedIn: true // 可以控制是否顯示登入按鈕或用戶選單
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action: string) => {
    handleMenuClose();
    // 這裡可以處理各種菜單項目的點擊事件
    switch (action) {
      case 'profile':
        console.log('前往個人資料頁面');
        break;
      case 'dashboard':
        console.log('前往儀表板');
        break;
      case 'settings':
        console.log('前往設定頁面');
        break;
      case 'logout':
        console.log('執行登出');
        break;
      default:
        break;
    }
  };

  return (
    <header className={styles.head}>
      <div className={styles.headerContainer}>
        {/* Logo */}
        <Link href="/">
          <div className="relative w-[calc(163/390*100vw)] lg:w-[160px] aspect-[512/98] hover:opacity-80 transition-opacity">
            <Image
              src="/assets/image/common/logo_2.png"
              alt="Romm 嗄歐麥麥"
              width={512}
              height={98}
              className="w-full h-full"
              priority={true}
            />
          </div>
        </Link>

        {/* Navigation Menu */}
        <div className="flex-1 flex justify-center">
          <SiteMenu />
        </div>

        {/* Right Side Icons and User Menu */}
        <div className="flex items-center gap-4">
          {/* Social Icons */}
          <div className="hidden md:flex items-center gap-3">
            <Tooltip title="Facebook">
              <IconButton 
                size="small" 
                className="hover:bg-blue-50 transition-colors"
                sx={{ 
                  '&:hover': { 
                    backgroundColor: 'rgba(24, 119, 242, 0.1)' 
                  } 
                }}
              >
                <FBIcon width={20} height={20} className="text-blue-600" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Instagram">
              <IconButton 
                size="small" 
                className="hover:bg-pink-50 transition-colors"
                sx={{ 
                  '&:hover': { 
                    backgroundColor: 'rgba(225, 48, 108, 0.1)' 
                  } 
                }}
              >
                <IGIcon width={20} height={20} className="text-pink-600" />
              </IconButton>
            </Tooltip>
            <Tooltip title="YouTube">
              <IconButton 
                size="small" 
                className="hover:bg-red-50 transition-colors"
                sx={{ 
                  '&:hover': { 
                    backgroundColor: 'rgba(255, 0, 0, 0.1)' 
                  } 
                }}
              >
                <YTIcon width={20} height={20} className="text-red-600" />
              </IconButton>
            </Tooltip>
            <Tooltip title="聯絡我們">
              <IconButton 
                size="small" 
                className="hover:bg-gray-50 transition-colors"
                sx={{ 
                  '&:hover': { 
                    backgroundColor: 'rgba(107, 114, 128, 0.1)' 
                  } 
                }}
              >
                <EnvelopeIcon width={20} height={20} className="text-gray-600" />
              </IconButton>
            </Tooltip>
          </div>

          {/* User Avatar and Menu */}
          {user.isLoggedIn ? (
            <>
              <Tooltip title="個人選單">
                <IconButton
                  onClick={handleAvatarClick}
                  size="small"
                  sx={{ 
                    padding: 0.5,
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <Avatar 
                    src={user.avatar} 
                    alt={user.name}
                    sx={{ 
                      width: 40, 
                      height: 40,
                      border: '2px solid #fff',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                      }
                    }}
                  >
                    {user.name.charAt(0)}
                  </Avatar>
                </IconButton>
              </Tooltip>
              
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    minWidth: 200,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                {/* User Info */}
                <MenuItem disabled sx={{ opacity: 1, cursor: 'default' }}>
                  <Avatar src={user.avatar} alt={user.name}>
                    {user.name.charAt(0)}
                  </Avatar>
                  <div>
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">會員</div>
                  </div>
                </MenuItem>
                
                <Divider />
                
                {/* Menu Items */}
                <MenuItem onClick={() => handleMenuItemClick('profile')}>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>個人資料</ListItemText>
                </MenuItem>
                
                <MenuItem onClick={() => handleMenuItemClick('dashboard')}>
                  <ListItemIcon>
                    <DashboardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>我的文章</ListItemText>
                </MenuItem>
                
                <MenuItem onClick={() => handleMenuItemClick('notifications')}>
                  <ListItemIcon>
                    <NotificationsIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>通知設定</ListItemText>
                </MenuItem>
                
                <MenuItem onClick={() => handleMenuItemClick('settings')}>
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>帳戶設定</ListItemText>
                </MenuItem>
                
                <Divider />
                
                <MenuItem onClick={() => handleMenuItemClick('logout')}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>登出</ListItemText>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Link href="/login" className="ml-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium">
                登入
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
