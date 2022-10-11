import { Link, useNavigate } from "react-router-dom";
import "../styles/BrowseLiveGames.css";
import useCollapse from "react-collapsed";
import { Dropdown, Menu, Space } from "antd";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";


export default function Navigation(props: any) {
  let token = JSON.parse(localStorage.getItem("token") || "{}");

  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  let navigate = useNavigate();

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a
              onClick={() => {
                localStorage.removeItem("token");
                props.setRefresh(Math.random());
                navigate("/login");
              }}
            >
              Logout
            </a>
          ),
        },
        {
          key: "2",
          label: (
            <>
              {typeof token === "string" && (
                <Link to="/change-password">
                  Change Password
                </Link>
              )}
            </>
          ),
        },
      ]}
    />
  );

  return (
    <div style={{ width: "100%" }}>
      <nav className="navbar" style={{ width: "100%" }}>
        <div className="logo" style={{marginLeft:"-10px",marginTop:"-10px",marginBottom:"3px"}}>
          <img style={{}} src="https://stillmed.olympics.com/media/Images/OlympicOrg/IOC/The_Organisation/The-Olympic-Rings/Olympic_rings_TM_c_IOC_All_rights_reserved_1.jpg" width="120" height="60" />
        </div>

        <ul className="nav-links" style={{ marginLeft: "10px" }}>
          <div className="menu" style={{ marginLeft: "10px" }}>
            <li>
              <Link to="/home">Browse Live Games</Link>
            </li>
            <li className="services">
              <Link to="/matchhighlights">Match Highlights</Link>
            </li>

            <li>
              <Dropdown overlay={menu}>
                  <Space>
                    My Account
                    <DownOutlined />
                  </Space>
              </Dropdown>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
}
