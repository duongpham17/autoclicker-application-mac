import styles from './Help.module.scss';
import { Fragment, useState } from 'react';
import useOpen from '@hooks/useOpen';
import {mouseEvents, mouseData, inputFields, seconds, permissions, scripts, videos} from './data';
import Container from '@components/containers/Style1';
import ContainerPlain from '@components/containers/Style2';
import Button from '@components/animations/buttons/Style1';
import Text from '@components/texts/Style2';
import Text1 from '@components/texts/Style1';
import Searchbar from '@components/searchbars/Style1';

const HelpPage = () => {

  const {onOpenArray, array} = useOpen({});

  const informations = [mouseEvents, inputFields, mouseData, seconds, scripts, permissions];

  const [results, setResults] = useState<typeof informations[0]["data"]>([])

  const onChange = (value: string) => {
    if(!value) return setResults([]);
    const results = [];
    for(const x of informations){
      const found = x.data.filter(el => el.text.includes(value) || el.sub.includes(value));
      results.push(found)
    };
    setResults(results.flat());
  };

  return (
    <div className={styles.container}>

      <Container>
        <Searchbar onSubmit={() => {}} onChange={onChange} />

        {!!results.length && 
          <div className={styles.results}>
            <Text1>Results Found {results.length}</Text1>
            {results.map((el, index) =>
              <ContainerPlain key={el.sub+index}>
                <Button onClick={() => onOpenArray(el.sub)} open={array.includes(el.sub)}>{el.sub}</Button>
                {array.includes(el.sub) && 
                  <Fragment>
                    <Text color="light">{el.text}</Text>
                  </Fragment>
                }
              </ContainerPlain>
            )}
          </div>
        }
      </Container>

      <section key={videos.title} id={videos.title}>
        <h2>{videos.title}</h2>
        {videos.data.map(el => 
          <Container color="dark" key={el.sub}>
            <Button onClick={() => onOpenArray(el.sub)} open={array.includes(el.sub)}>{el.sub}</Button>
            {array.includes(el.sub) && 
              <Fragment>
                <Text color="light">{el.text}</Text>
                <iframe src={el.youtube} title="YouTube video player" allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" />
              </Fragment>
            }
          </Container>
        )}
      </section>
      
      {informations.map((el) =>
        <section key={el.title} id={el.title}>
          <h2>{el.title}</h2>
          {el.data.map(el => 
            <Container color="dark" key={el.sub}>
              <Button onClick={() => onOpenArray(el.sub)} open={array.includes(el.sub)}>{el.sub}</Button>
              {array.includes(el.sub) && <Text color="light">{el.text}</Text>}
            </Container>
          )}
        </section>
      )}
    
    </div>
  )
}

export default HelpPage