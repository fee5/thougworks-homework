import React, {PureComponent} from 'react'
import TabFilter from '../../components/TabFilter'

export default class C extends PureComponent {
  state = {
    filters: [{
      name: 'all',
      active: false,
    }, {
      name: 'physical',
      active: true,
    }, {
      name: 'virtual',
      active: false,
    }],
    values: {},
    items: [{
      name: 'bjstdmngbgr01.thoughtworks.com',
      status: 'idle',
      ip: '192.168.1.2',
      path: '/var/lib/cruise-agent',
      editing: false,
      resources: ['ubuntu', 'firefox', 'core-duo']
    }, {
      name: 'bjstdmngbgr02.thoughtworks.com',
      status: 'building',
      ip: '192.168.1.2',
      path: '/var/lib/cruise-agent',
      editing: false,
      resources: ['ubuntu', 'firefox', 'core-duo']
    }, {
      name: 'bjstdmngbgr03.thoughtworks.com',
      status: 'building',
      ip: '192.168.1.2',
      path: '/var/lib/cruise-agent',
      editing: false,
      resources: ['ubuntu', 'firefox', 'core-duo']
    }, {
      name: 'bjstdmngbgr04.thoughtworks.com',
      status: 'idle',
      ip: '192.168.1.2',
      path: '/var/lib/cruise-agent',
      editing: false,
      resources: ['ubuntu', 'firefox', 'core-duo']
    }],
  }

  handleAdd = key => () => {
    const newItems = [...this.state.items]
    newItems[key].resources = [...newItems[key].resources]
    newItems[key].editing = true
    this.setState({
      items: newItems
    })
  }

  handleRemove = (key, value) => () => {
    const newItems = [...this.state.items]
    newItems[key].resources.splice(newItems[key].resources.indexOf(value), 1)
    newItems[key].resources = [...newItems[key].resources]
    this.setState({
      items: newItems,
    })
  }

  handleAddResources = key => () => {
    if (!this.state.values[key]) return
    const newItems = [...this.state.items]
    Array.prototype.push.apply(newItems[key].resources, this.state.values[key].split(',').map(v => v.trim()).filter(v => !!v))
    newItems[key].resources = [...newItems[key].resources]
    this.setState({
      items: newItems,
    })
  }

  setValue = key => e => {
    this.setState({
      values: {
        ...this.state.values,
        [key]: e.target.value,
      },
    })
  }

  handleCloseAdd = key => () => {
    const newItems = [...this.state.items]
    newItems[key].editing = false
    this.setState({
      items: newItems,
    })
  }

  render() {
    return (
      <div className="container">
        <TabFilter label="agents" filters={this.state.filters}/>
        <div className="agent-items">
          {
            this.state.items.map((v, k) => {
              const {name, status, ip, path, editing, resources} = v

              return (
                <div className={`agent-item ${status}`} key={k}>
                  <div className="item-brand"/>
                  <div className="item-detail">
                    <div className="item-info">
                      <span>{name}</span>
                      <span>{status}</span>
                      <span>{ip}</span>
                      <span>{ip}</span>
                      <span>{path}</span>
                    </div>
                    <div className="clearfix">
                      <div className="float-left">
                        <span className="item-add">
                          <a href="javascript:;" onClick={this.handleAdd(k)}>+ Specify Resources</a>
                        </span>
                        {
                          resources.map((v, rKey) => (
                            <span key={rKey} className="item-resource-detail">
                              <span>
                                {v}
                              </span>
                              <a href="javascript:;" onClick={this.handleRemove(k, v)}>&times;</a>
                            </span>
                          ))
                        }
                      </div>
                      {
                        status === 'idle'
                        ? <div className="float-right">
                          &#x000D8; <a href="">Deny</a>
                        </div>
                        : undefined
                      }
                    </div>
                    {
                      editing
                      ? (
                        <div className="form-add">
                          <div>(Separate multiple resources name with commas)</div>
                          <input type="text" onChange={this.setValue(k)}/>
                          <div>
                            <button onClick={this.handleAddResources(k, v)}>Add Resources</button>
                            <button onClick={this.handleCloseAdd(k)}>Close</button>
                          </div>
                        </div>
                      )
                      : undefined
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
