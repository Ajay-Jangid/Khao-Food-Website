import React from "react";
import "./User.css"
class UserClass extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
            }
        }
    }

    async componentDidMount() {
        const data = await fetch("https://api.github.com/users/Ajay-Jangid")
        const json = await data.json()
        this.setState({
            userInfo: json
        })
        console.log(json)
    }

    componentWillUnmount() {
        console.log('unmount')
    }

    componentDidUpdate() {
        console.log('did update')
    }

    render() {  // render methods return some piece of jsx.
        // const { name } = this.props
        const { name, location, avatar_url } = this.state.userInfo
        // const { name } = userInfo ? userInfo : {}
        return (
            <div className="user-card">
                <img src={avatar_url} alt="" />
                <h2>Name: {name}</h2>
                <h3>Location: {location}</h3>
                <h4>Contact: @Ajayjangid07</h4>
            </div>
        )
    }
}

export default UserClass;