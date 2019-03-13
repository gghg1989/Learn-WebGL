function HalfEdge()
{
  this.nextHalfEdge = undefined;  // points to the next halfedge around the current face (CCW)
  this.flipHalfEdge = undefined;  // points to the other halfedge associated with this edge
  this.vertex = undefined;        // points to the vertex at the "tail" of this halfedge
  this.edge = undefined;          // points to the edge associated with this halfedge
  this.face = undefined;          // points to the face containing this halfedge  
};

HalfEdge.prototype.setVertex = function( vertex ) {
  this.vertex = vertex;
};

HalfEdge.prototype.getVertex = function() {
  return this.vertex;
};

HalfEdge.prototype.setFace = function( face ) {
  this.face = face;
};

HalfEdge.prototype.getFace = function() {
  return this.face;
};

HalfEdge.prototype.setEdge = function( edge ) {
  this.edge = edge;
};

HalfEdge.prototype.getEdge = function() {
  return this.edge;
};

HalfEdge.prototype.setNextHalfEdge = function( nextHalfEdge ) {
  this.nextHalfEdge = nextHalfEdge;
};

HalfEdge.prototype.getNextHalfEdge = function() {
  return this.nextHalfEdge;
};

HalfEdge.prototype.setFlipHalfEdge = function( flipHalfEdge ) {
  this.flipHalfEdge = flipHalfEdge;
};

HalfEdge.prototype.getFlipHalfEdge = function() {
  return this.flipHalfEdge;
};

HalfEdge.prototype.onBoundary = function() {
  if( this.getFlipHalfEdge() ) {
    return false;
  }
  return true;
};

HalfEdge.prototype.getAllHe = function() {
  var hes = [this];
  var currentHe = this;
  while(true) {
    var he1stNext = currentHe.getNextHalfEdge();
    var he2ndNext = he1stNext.getNextHalfEdge();
    var he = he2ndNext.getFlipHalfEdge();
    if (he.edge[0] == this.edge[0] && he.edge[1] == this.edge[1]) {
      break;
    }
    hes.push(he);
    currentHe = he;
  }
  return hes;
}

HalfEdge.prototype.getVector = function() {
  var nextHe = this.getNextHalfEdge();
  var nextV = nextHe.getVertex();
  var thisV = this.getVertex();
  var thisVector = vec3.fromValues(
    nextV[0] - thisV[0],
    nextV[1] - thisV[1],
    nextV[2] - thisV[2]);
  return thisVector;
}

HalfEdge.prototype.getLength = function() {
  return vec3.length(this.getVector());
}

HalfEdge.prototype.getAngle = function() {
  var he1stNext = this.getNextHalfEdge();
  var he2ndNext = he1stNext.getNextHalfEdge();
  var he = he2ndNext.getFlipHalfEdge();
  return vec3.angle(this.getVector(), he.getVector());

}

HalfEdge.prototype.getGaussianCurvature = function() {
  var sum = this.getAngle();
  var currentHe = this;
  while(true) {
    var he1stNext = currentHe.getNextHalfEdge();
    var he2ndNext = he1stNext.getNextHalfEdge();
    var he = he2ndNext.getFlipHalfEdge();
    if (he.edge[0] == this.edge[0] && he.edge[1] == this.edge[1]) {
      break;
    }
    sum += he.getAngle();
    currentHe = he;
  }
  return 2 * Math.PI - sum;
}


