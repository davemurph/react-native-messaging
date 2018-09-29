import md5 from 'blueimp-md5';

export default generateAvatarUrl = (avatarSize, email) => {
  let emailHash = md5(email);

  emailHash = emailHash || "3eda6fcd3204ef285fa52176c28c4d3e"; // Equivalent to Gravatar.hash( 'none@none.com' );
  //return Gravatar.imageUrl( md5hash, { secure: true, size: avatarSize, d: 'wavatar', rating: 'pg' } );
  return `https://www.gravatar.com/avatar/${emailHash}?s=${avatarSize}&r=x&d=wavatar`;
}