import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, ActivityIndicator, ScrollView} from 'react-native';
import axios from 'axios';
import Button from '../components/Button';

const Details = (props) => {
  const {source64} = props.route.params
  const BASE_URL = 'https://trace.moe/api';
  const [data, setData] = useState('');
  const [error, setError] = useState('');
  const [limit, setLimit] = useState(0);
  const [limitTtl, setLimitTtl] = useState(0);
  const [quotaTtl, setQuotaTtl] = useState(0);

  useEffect(() => {
    fetch();
  },[])

  const fetch = () => {
    setData(null);
    axios.post(`${BASE_URL}/search`,{image:source64})
    .then(res => {
      setData(res.data.docs);
      setLimit(res.data.limit);
      console.log({limit: res.data.limit});
    })
    .catch(err => {
      !limitTtl ? setLimitTtl(60) : null;
      setQuotaTtl(86400);
      const errors = err.response.data;
      if (!!errors === errors.includes('limit_ttl')) {
        setError(`Search quota exceeded. Please wait ${limitTtl} seconds.`);
      } else if (!!errors === errors.includes('quota_ttl')) {
        setError('Search quota exceeded. Please wait until tomorrow.');
      } else {
        setError(err.response.data);
      }
    })
  }

  return (
    <View style={[styles.flex, styles.center]}>
      {data ? (
		  <ScrollView style={styles.flex}>
        <View style={styles.flex}>
          <Image source={{uri: source64}} style={{width: '100%', height: 200, alignSelf:'center'}} />
          {data.map((anime, index) => {
			  return(
				<View key={index}>
					<Text style={styles.text}>anime: {anime.anime}</Text>
					<Text style={styles.text}>episode: {anime.episode}</Text>
            	</View> 
			  )
          })}
          <Text style={styles.text}>Limit: {limit && limit} times</Text>
        </View>
			  </ScrollView>
      ) : (
        <View>
          {error ? (
            <>
              <Text style={styles.text}>
                {error}
              </Text>
              <View style={[styles.center]}>
                <Button title="Reload" nav={() => fetch()} />
              </View>
            </>
          ) : (
            <ActivityIndicator size="large" />
          )}
        </View>
      )}
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  flex: {flex: 1},
  text: {fontSize: 30, alignSelf:'center', textAlign:'center', paddingHorizontal: 10},
  center: {justifyContent: 'center', alignItems: 'center'},
});
