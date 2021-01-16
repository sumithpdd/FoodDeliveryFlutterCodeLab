import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

// import Link from './link';
import config from '../../config';
import { Sidebar, ListItem } from './styles/Sidebar';

const SidebarLayout = ({ location }) => (
  <StaticQuery
    query={graphql`
      query {
        allMdx {
          edges {
            node {
              fields {
                slug
              }
              tableOfContents
              fields {
                slug
              }
            }
          }
        }
      }
    `}
    render={({ allMdx }) => {
      let navItems = [];

      let finalNavItems;

      if (allMdx.edges !== undefined && allMdx.edges.length > 0) {

        const navItems = allMdx.edges.map((item, index) => {

          let innerItems;

          if (item !== undefined) {
            if (
              item.node.fields.slug === location.pathname ||
              config.gatsby.pathPrefix + item.node.fields.slug === location.pathname
            ) {
              if (item.node.tableOfContents.items) {
                //table content start first
                innerItems = item.node.tableOfContents.items.map((innerItem, index) => {

                  const itemId = innerItem.title
                    ? innerItem.title.replace(/\s+/g, '').toLowerCase()
                    : '#';
                    let itemsofitems;


                  return (<div>
                    <ListItem key={index} to={`#${itemId}`} level={1}>
                      {innerItem.title}
                    </ListItem>


                    {


                    // secon tableofcontecnt start
                    innerItem.items !== undefined ?

                    innerItems = innerItem.items.map((innerItem1, index) => {

                      const itemId1 = innerItem1.title
                        ? innerItem1.title.replace(/\s+/g, '').toLowerCase()
                        : '#';

                      return (
                        <ListItem key={index} to={`#${itemId1}`} level={2}>
                          {innerItem1.title}
                        </ListItem>)
                    })
                    : ''
                  }
                    {/* //secon tableofcontecnt end */}

                  </div>)
                });
                //table content ending first
              }
            }
          }
          if (innerItems) {
            finalNavItems = innerItems;
          }
        });
      }

      if (finalNavItems && finalNavItems.length) {
        return (
          <Sidebar>
            <ul className={'rightSideBarUL'}>
              <li className={'rightSideTitle'}>CONTENTS</li>
              {finalNavItems}
            </ul>
          </Sidebar>
        );
      } else {
        return (
          <Sidebar>
            <ul></ul>
          </Sidebar>
        );
      }
    }}
  />
);

export default SidebarLayout;
