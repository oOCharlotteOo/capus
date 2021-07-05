import React, {useRef} from 'react';
import Carousel from 'react-native-snap-carousel';
import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import {tailwind} from '../../../tailwind';

const Comments = props => {
  const {comments} = props;
  const carouselRef = useRef(null);

  const _renderItem = slide => {
    const {author, comment} = slide.item;

    return (
      <View style={tailwind('pl-2 pr-2')}>
        <Text style={tailwind('font-bold text-coolGray-700')}>{author}</Text>
        <Text style={tailwind('text-gray-300')}>{comment}</Text>
      </View>
    );
  };

  const width = Dimensions.get('window').width * 0.75;

  return (
    <View style={tailwind('bg-white rounded-lg p-6')}>
      <View style={tailwind('absolute top-6 -left-10')}>
        <TouchableOpacity
          onPress={() => carouselRef.current.snapToPrev()}
          style={tailwind('p-4')}>
          <Image
            source={require('../../assets/images/chevron-left.png')}
            style={tailwind('w-12 h-12')}
          />
        </TouchableOpacity>
      </View>
      <Carousel
        loop={true}
        sliderWidth={width}
        itemWidth={width}
        data={comments}
        renderItem={_renderItem}
        ref={carouselRef}
      />
      <View style={tailwind('absolute top-6 -right-10')}>
        <TouchableOpacity
          onPress={() => carouselRef.current.snapToNext()}
          style={tailwind('p-4')}>
          <Image
            source={require('../../assets/images/chevron-right.png')}
            style={tailwind('w-12 h-12')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Comments;
