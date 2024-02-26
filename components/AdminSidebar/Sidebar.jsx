import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  PermIdentity,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  MenuBook,
  Report,
  ReportProblem,
  AddModerator,
} from "@mui/icons-material";

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebars">
      <div className="sidebarWrappers">
        <div className="sidebarMenus">
          <h3 className="sidebarTitles">Admin Paneli</h3>
          <ul className="sidebarLists">
            <Link to="/adminpanel" className="links">
              <li className="sidebarListItems actives">
                <Timeline className="sidebarIcons" />
                Anasayfa & İstatistikler
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenus">
          <h3 className="sidebarTitles">Menü</h3>
          <ul className="sidebarLists">
            <Link to="/kullanicilar" className="links">
              <li className="sidebarListItems">
                <PermIdentity className="sidebarIcons" />
                Kullanıcılar
              </li>
            </Link>
            <Link to="/gonderiler" className="links">
              <li className="sidebarListItems">
                <MenuBook className="sidebarIcons" />
                Gönderiler
              </li>
            </Link>
            <Link to="/gonderi-sikayetler" className="links">
              <li className="sidebarListItems">
                <Report className="sidebarIcons" />
                Gönderi şikayetleri
              </li>
            </Link>
            <Link to="/kullanici-sikayetler" className="links">
              <li className="sidebarListItems">
                <Report className="sidebarIcons" />
                Kullanıcı şikayetleri
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenus">
          <h3 className="sidebarTitles">Kullanıcı Arayüzünden</h3>
          <ul className="sidebarLists">
            <Link to="/admin" className="links">
              <li className="sidebarListItems">
                <AddModerator className="sidebarIcons" />
                Anasayfa
              </li>
            </Link>
            <Link to="/sikayetler">
              <li className="sidebarListItems">
                <ReportProblem className="sidebarIcons" />
                Gönderi şikayetler
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
