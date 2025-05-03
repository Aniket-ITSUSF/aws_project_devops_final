module.exports = {
  branches: [
    'main',
    'develop',
    { name: 'uat', prerelease: true }
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    ['@semantic-release/github', { assets: ['dist/*.tgz'] }],
    ['@semantic-release/docker', {
      dockerRegistry: process.env.AWS_ACCOUNT_ID + ".dkr.ecr." + process.env.AWS_REGION + ".amazonaws.com",
      imageName: (pluginConfig, {repositoryName}) => repositoryName,
    }],
    '@semantic-release/git'
  ]
};
