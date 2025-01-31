import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import TinderCard from '../../components/TinderCard';

const DUMMY_DATA = [
  {
    id: 1,
    name: 'Sarah',
    age: 24,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Michael',
    age: 27,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Jessica',
    age: 25,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop',
  },
];

export default function DiscoverScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [profiles, setProfiles] = useState(DUMMY_DATA);

  const handleSwipeLeft = () => {
    setCurrentIndex(currentIndex + 1);
    // Here you would typically handle the "nope" action
    console.log('Swiped left (nope)');
  };

  const handleSwipeRight = () => {
    setCurrentIndex(currentIndex + 1);
    // Here you would typically handle the "like" action
    console.log('Swiped right (like)');
  };

  return (
    <View style={styles.container}>
      {profiles.map((profile, index) => {
        if (index < currentIndex) return null;
        // Only show the current card and the next card
        if (index > currentIndex + 1) return null;

        return (
          <TinderCard
            key={profile.id}
            item={profile}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            isFirst={index === currentIndex}
          />
        );
      }).reverse()} 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});