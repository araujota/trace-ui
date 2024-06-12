import { useState } from 'react';
import { Group } from '@visx/group';
import { hierarchy, Tree } from '@visx/hierarchy';
import getLinkComponent from './getLinkComponent';
import { Tooltip } from 'react-tooltip';
import './App.css';

const images = {
  nyt: require('./assets/nyt.jpeg'),
  wsj: require('./assets/wsj.jpeg'),
  cnn: require('./assets/cnn.png')
}


interface TreeNode {
  name: string;
  isExpanded?: boolean;
  date?: string;
  source?: string;
  imgURL?: string;
  children?: TreeNode[];
}

const testData = [
  {title: 'oldest 1', date: '11-01-2000', source: 'The New York Times'},
  {title: 'test 2', date: '11-01-2005', source: 'The Wall Street Journal'},
  {title: 'test 3', date: '11-01-2010', source: 'CNN'},
  {title: 'test 2', date: '11-01-2005', source: 'The New York Times'},
  {title: 'test 3', date: '11-01-2010', source: 'The Wall Street Journal'},
  {title: 'test 2', date: '11-01-2005', source: 'CNN'},
  {title: 'test 3', date: '11-01-2010', source: 'The New York Times'},
  {title: 'test 2', date: '11-01-2005', source: 'The Wall Street Journal'},
  {title: 'test 3', date: '11-01-2010', source: 'CNN'},
  {title: 'test 2', date: '11-01-2005', source: 'The New York Times'},
  {title: 'test 3', date: '11-01-2010', source: 'The Wall Street Journal'},
  {title: 'test root', date: '11-01-2015', source: 'CNN'}
]

const getImgURLFromSource = (source: string) => {
  switch (source) {
    case 'The New York Times' :
      return 'nyt';
    
    case 'The Wall Street Journal' :
      return 'wsj';

    case 'CNN' :
      return 'cnn'
  }
}

const accessorySubjects = [
  {title: 'subject 1'},
  {title: 'subject 2'},
  {title: 'subject 3'}
]

const createTreeFromData = (data: Array<any>, secondaryData: Array<any>) => {
  let rootNode: TreeNode = {
    name: data[0].title, 
    date: data[0].date,
    imgURL: getImgURLFromSource(data[0].source),
    children: []
  }

  let parentNode = rootNode;

  for (let i = 1; i < data.length; i++) {
    let newNode: TreeNode = {
      name: data[i].title, 
      date: data[i].date,
      imgURL: getImgURLFromSource(data[i].source),
      children: []
    };

    parentNode.children?.push(newNode);
    parentNode = newNode;
  }

  for (let i = 0; i < secondaryData.length; i++) {
    let accessoryNode: TreeNode = {
      name: secondaryData[i].title,
      children: []
    };

    parentNode.children?.push(accessoryNode);
  }
  return rootNode;
}

createTreeFromData(testData, accessorySubjects)

const defaultMargin = { top: 30, left: 30, right: 30, bottom: 70 };

export type LinkTypesProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export type MarginProps = {
  top: number,
  left: number,
  right: number,
  bottom: number
}

export const NodeMap: any = (articleArray: Array<any>) => {
  const [layout, setLayout] = useState<string>('cartesian');
  const [orientation, setOrientation] = useState<string>('horizontal');
  const [linkType, setLinkType] = useState<string>('diagonal');
  const [stepPercent, setStepPercent] = useState<number>(0.5);
  const articles = articleArray;

  const LinkComponent = getLinkComponent({ layout, linkType, orientation });

  

  return (
    <div>
      <Tooltip id="articleTooltip" 
      style={{ margin: 0, padding: 0, backgroundColor: "white", color: "black", width: 200, height: 'auto', display: 'flex', justifyContent: 'center'}} 
      border='2px solid black' 
      opacity={1} 
      arrowColor='black' 
      render={({content, activeAnchor}) => (
        <>
        <div className='tooltipHeader'>
          <text>{content}</text>
        </div>
        {activeAnchor?.getAttribute('data-date') ? (
          <>
          <div style={{margin: '5px'}}>
            <text> Published {activeAnchor?.getAttribute('data-date') || 'no date available'}</text>
          </div>
          <div style={{margin: '5px'}}>
            <text>Click to view full article</text>
          </div>
          </>
        ) : (
          <div style={{margin: '5px'}}>
            <text>Click to Trace this subject</text>
          </div>
        )}
        
        </>
      )}
      />

      <svg width={1400} height={700}>
        <Group top={10} left={10}>
          <Tree
            root={hierarchy(createTreeFromData(testData, accessorySubjects), (d) => (d.isExpanded ? null : d.children))}
            size={[500, 1200]}
            separation={(a, b) => (a.parent === b.parent ? 1 : 0.5) / a.depth}>
            {(tree) => (
              <Group top={125} left={100}>
                {tree.links().map((link, i) => (
                  <LinkComponent
                    key={i}
                    data={link}
                    percent={stepPercent}
                    stroke="rgb(0,0,0,1)"
                    strokeWidth="5"
                    fill="none"
                  />
                ))}
                {tree.descendants().map((node, key) => {
                  const width = 80;
                  const height = 80;
                  let top: number = node.x;
                  let left: number = node.y;
                  
                  return (
                    <a style={{outline: 'none'}} data-tooltip-id='articleTooltip' data-tooltip-content={node.data.name} data-date={node.data.date} data-tooltip-place="bottom">
                      <defs>
                        <pattern id="wsj" patternUnits="objectBoundingBox" width="60" height="60">
                          <image href={images.wsj} x="0" y="0" width="60" height="60" />
                        </pattern>
                        <pattern id="nyt" patternUnits="objectBoundingBox" width="60" height="60">
                          <image href={images.nyt} x="0" y="0" width="60" height="60" />
                        </pattern>
                        <pattern id="cnn" patternUnits="objectBoundingBox" width="60" height="60">
                          <image href={images.cnn} x="0" y="0" width="60" height="60" />
                        </pattern>
                      </defs>
                      <Group top={top} left={left} key={key}>
                          <circle
                            r={30}
                            y={-height / 2}
                            x={-width / 2}
                            fill={node.data.imgURL == 'nyt' ? 'url(#nyt)' : node.data.imgURL == 'cnn' ? 'url(#cnn)' : node.data.imgURL == 'wsj' ? 'url(#wsj)': 'white'}
                            stroke={node.data.children && node.data.children?.length > 1 ? 'orange' : node.data.children?.length == 1 ? 'black' : 'blue'}
                            strokeWidth={5}
                            strokeOpacity={1}
                            onClick={() => {
                              node.data.isExpanded = !node.data.isExpanded;
                              console.log(node);
                            }}
                          >
                          </circle>
                          
                          {!node.data.imgURL && (
                            <text
                            dy=".33em"
                            fontSize={12}
                            fontFamily="Arial"
                            textAnchor="middle"
                            style={{ pointerEvents: 'none' }}
                            fill='black'
                          >
                            {node.data.name}
                          </text>
                          )}
                          
                        
                    </Group>
                      </a>  
                  );
                })}
              </Group>
            )}
          </Tree>
        </Group>
      </svg>
    </div>
  );
}