import React, { useState,useContext } from 'react';
import { GlobalDispatchContext, GlobalStateContext} from '../../context/GlobalContextProvider'
  
import config from '../../../config';
//import TreeNode from './treeNode';
import Link from '../link'
 
 

const calculateTreeData = edges => {
  const originalData = edges;
  // const originalData =  config.sidebar.ignoreIndex
  // ? edges.filter(
  //   ({
  //     node: {
  //       fields: { slug },
  //     },
  //   }) => slug !== '/'
  // )
  // : edges;
    

  const tree = originalData.reduce(
    (
      accu,
      {
        node: {
          fields: { slug, title },
        },
      }
    ) => {
      const parts = slug.split('/');

      let { items: prevItems } = accu;

      const slicedParts =
        config.gatsby && config.gatsby.trailingSlash ? parts.slice(1, -2) : parts.slice(1, -1);

      for (const part of slicedParts) {
        let tmp = prevItems && prevItems.find(({ label }) => label == part);

        if (tmp) {
          if (!tmp.items) {
            tmp.items = [];
          }
        } else {
          tmp = { label: part, items: [] };
          prevItems.push(tmp);
        }
        prevItems = tmp.items;
      }
      const slicedLength =
        config.gatsby && config.gatsby.trailingSlash ? parts.length - 2 : parts.length - 1;

      const existingItem = prevItems.find(({ label }) => label === parts[slicedLength]);

      if (existingItem) {
        existingItem.url = slug;
        existingItem.title = title;
      } else {
        prevItems.push({
          label: parts[slicedLength],
          url: slug,
          items: [],
          title,
        });
      }
      return accu;
    },
    { items: [] }
  );

  const {
    sidebar: { forcedNavOrder = [] },
  } = config;

  const tmp = [...forcedNavOrder];

  if (config.gatsby && config.gatsby.trailingSlash) {
  }
  tmp.reverse();
  return tmp.reduce((accu, slug) => {
    const parts = slug.split('/');

    let { items: prevItems } = accu;

    const slicedParts =
      config.gatsby && config.gatsby.trailingSlash ? parts.slice(1, -2) : parts.slice(1, -1);

    for (const part of slicedParts) {
      let tmp = prevItems.find(item => item && item.label == part);

      if (tmp) {
        if (!tmp.items) {
          tmp.items = [];
        }
      } else {
        tmp = { label: part, items: [] };
        prevItems.push(tmp);
      }
      if (tmp && tmp.items) {
        prevItems = tmp.items;
      }
    }
    // sort items alphabetically.
    prevItems.map(item => {
      item.items = item.items.sort(function (a, b) {
        if (a.label < b.label) return -1;
        if (a.label > b.label) return 1;
        return 0;
      });
    });
    const slicedLength =
      config.gatsby && config.gatsby.trailingSlash ? parts.length - 2 : parts.length - 1;

    const index = prevItems.findIndex(({ label }) => label === parts[slicedLength]);

    if (prevItems.length) {
      accu.items.unshift(prevItems.splice(index, 1)[0]);
    }
    return accu;
  }, tree);
};

const Tree = ({ edges }) => {
  
  const dispatch = useContext(GlobalDispatchContext);
  const state = useContext(GlobalStateContext);
  // console.log('state');
  // console.log(state.linklist);
  // console.log('logforaddtocart');
   
  let [treeData] = useState(() => {
    return calculateTreeData(edges);
  });


  console.log('ssdfsd');
  console.log(treeData);

  const defaultCollapsed = {};

  treeData.items.forEach(item => {
    if (config.sidebar.collapsedNav && config.sidebar.collapsedNav.includes(item.url)) {
      defaultCollapsed[item.url] = true;
    } else {
      defaultCollapsed[item.url] = false;
    }
  });
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const toggle = url => {
    setCollapsed({
      ...collapsed,
      [url]: !collapsed[url],
    });
  };
  let location;

  if (typeof document != 'undefined') {
    location = document.location;
  }
  // let active =
  //   location && (location.pathname === url || location.pathname === config.gatsby.pathPrefix + url);

  let calculatedClassName = `showFrontLine firstLevel item `;



   const changeStatus = (index) => {
    let constssd = { 
      type: "LINK_THEME",
      data: index
    }
    return (
      dispatch(constssd)
    )

    // if(checktick.indexOf(index) === -1){
    //   setChecktick([...checktick, index]);
    //   dispatch(toggleDarkMode(index))
    // }
    // return 'addd';
  } 
  treeData.items.shift();
   return (
    treeData.items.map((item, index) => (
      <li className={calculatedClassName} key={index+1}>
        {
        item.title && (
          <Link to={item.url} onClick={() => changeStatus(item.url)}>
            { 
              (state.linklist.indexOf(item.url) !== -1) ?
                <div className="checkGreen">
                  <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16"><path d="M9 16.2l-3.5-3.5c-.39-.39-1.01-.39-1.4 0-.39.39-.39 1.01 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7c.39-.39.39-1.01 0-1.4-.39-.39-1.01-.39-1.4 0L9 16.2z"></path></svg>
                </div> : index+1

            }
            <p style={{ marginLeft: '10px' }}>{item.title}</p>
          </Link>
        )}

      </li>
    ))
  );

};

export default Tree;
